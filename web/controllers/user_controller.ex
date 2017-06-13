defmodule Osame.UserController do
  use Osame.Web, :controller

  alias Osame.User
  alias Osame.AuthController

  plug Guardian.Plug.EnsureAuthenticated, [handler: AuthController] when action in [:me]

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, :index, users: users)
  end

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, :show, user: user)
  end

  def me(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    render(conn, :show, user: user)
  end
end
