defmodule Osame.CountryView do
  use Osame.Web, :view

  def render("index.json", %{countries: countries}) do
    %{countries: render_many(countries, Osame.CountryView, "country.json")}
  end

  def render("show.json", %{country: country}) do
    %{country: render_one(country, Osame.CountryView, "country.json")}
  end

  def render("country.json", %{country: country}) do
    %{id: country.id,
      name: country.name,
      imageUrl: country.image_url,
      usersCount: country.users_count,
      elo: country.elo,
      winsCount: country.wins_count,
      lossesCount: country.losses_count}
  end
end
