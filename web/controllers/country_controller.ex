defmodule Osame.CountryController do
  use Osame.Web, :controller

  alias Osame.Country

  def index(conn, _params) do
    countries = Repo.all(Country)
    render(conn, :index, countries: countries)
  end

  def show(conn, %{"id" => id}) do
    country = Repo.get!(Country, id)
    render(conn, :show, country: country)
  end
end
