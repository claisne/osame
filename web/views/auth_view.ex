defmodule Osame.AuthView do
  use Osame.Web, :view

  def render("login_success.json", %{user: user, jwt: jwt, claims: claims}) do
    %{user: render_one(user, Osame.UserView, "user.json"),
      jwt: jwt,
      claims: claims}
  end
end

