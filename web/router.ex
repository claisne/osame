defmodule Osame.Router do
  use Osame.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_authentication do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Osame do
    pipe_through :api
    pipe_through :api_authentication

    scope "/users" do
      get "/", UserController, :index
      get "/me", UserController, :me
    end

    resources "/countries", CountryController, only: [:index, :show]

    scope "/auth" do
      post "/login", AuthController, :login
      post "/register", AuthController, :register
      get "/logout", AuthController, :logout
    end
  end

  scope "/", Osame do
    pipe_through :browser # Use the default browser stack

    get "/", IndexController, :index
    get "/games", IndexController, :index
    get "/rankings", IndexController, :index
    get "/account", IndexController, :index
    get "/game", IndexController, :index
    get "/games/:id", IndexController, :index
  end
end
