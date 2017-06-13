defmodule Osame.IndexController do
  use Osame.Web, :controller

  def index(conn, _params) do
    render conn, :index
  end
end
