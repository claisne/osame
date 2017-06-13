defmodule Osame.User do
  use Osame.Web, :model
  require Logger

  @rand_activation_token_length 25

  schema "users" do
    field :name, :string
    field :email, :string

    field :password, :string, virtual: true
    field :password_hash, :string

    field :actived, :boolean
    field :activation_token, :string

    belongs_to :country, Osame.Country

    timestamps
  end

  def changeset(user, params \\ %{}) do
    user
    |> cast(params, [:name, :email, :password, :country_id])
    |> validate_required([:name, :email, :password, :country_id])
    |> validate_name
    |> validate_email
    |> validate_password
    |> constraints
  end

  def registration_changeset(user, params \\ %{}) do
    user
    |> changeset(params)
    |> put_password_hash
    |> put_activation_token
  end

  defp validate_name(user) do
    user
    |> validate_length(:name, min: 3, max: 20)
    |> validate_format(:name, ~r/^[a-zA-Z0-9_]*$/)
  end

  defp validate_password(user) do
    user
    |> validate_length(:name, min: 3, max: 100)
  end

  defp validate_email(user) do
    user
    |> validate_length(:name, max: 150)
    |> validate_format(:email, ~r/^[^@]+@[^@]+$/)
  end

  defp constraints (user) do
    user
    |> unique_constraint(:email)
    |> unique_constraint(:name)
    |> foreign_key_constraint(:country_id)
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(password))
      _ -> changeset
    end
  end

  defp put_activation_token(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{name: name}} ->
        put_change(changeset, :activation_token, new_activation_token(name))
      _ -> changeset
    end
  end

  defp new_activation_token(name) do
    rand_string = Osame.Utils.random_string(@rand_activation_token_length)
    name <> ":" <> rand_string
  end
end
