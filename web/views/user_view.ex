defmodule Osame.UserView do
  use Osame.Web, :view

  def render("index.json", %{users: users}) do
    %{users: render_many(users, Osame.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{user: render_one(user, Osame.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email,
      countryId: user.country_id,
      insertedAt: user.inserted_at}
  end

  def socket_assign(user) do
    %{id: user.id,
      name: user.name,
      country_id: user.country_id}
  end

  def chat_message(user) do
    %{id: user.id,
      name: user.name,
      countryId: user.country_id}
  end
end
