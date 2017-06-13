defmodule Osame.AuthHelper do
  import Ecto.Query

  alias Osame.{Repo, User, Country}

  def authenticate(identifier, password) do
    find_user_query = from(u in User,
      where: u.name == ^identifier or u.email == ^identifier,
      select: u,
      preload: :country)

    case Repo.one(find_user_query) do
      nil ->
        Comeonin.Bcrypt.dummy_checkpw()
        {:error, :login_user_not_found}
      user ->
        if Comeonin.Bcrypt.checkpw(password, user.password_hash) do
          {:ok, user}
        else
          {:error, :login_bad_password}
        end
    end
  end

  def register(registration_params) do
    changeset = User.registration_changeset(%User{}, registration_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        from(c in Country, where: c.id == ^user.country_id)
        |> Repo.update_all(inc: [users_count: 1])

        {:ok, user}
      {:error, _changeset} ->
        {:error, :register_bad_entity}
    end
  end

  def encode_and_sign(user) do
    case Guardian.encode_and_sign(user, :api) do
      {:ok, jwt, claims} -> {:ok, jwt, claims}
      {:error, _reason} -> {:error, :login_token_encode}
    end
  end
end
