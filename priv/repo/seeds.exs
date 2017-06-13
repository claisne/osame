
defmodule Osame.Seeds do
  alias Osame.Repo
  alias Osame.{Country, User}

  def country(changes = %{name: name}) do
    case Repo.get_by(Country, name: name) do
      nil -> %Country{}
      country ->  country
    end
    |> Country.changeset(changes)
    |> Repo.insert_or_update!
  end

  def countries(changes_list) do
    changes_list
    |> Enum.each(fn changes -> country(changes) end)
  end

  def user(changes = %{name: name}) do
    case Repo.get_by(User, name: name) do
      nil -> %User{}
      user -> user
    end
    |> User.registration_changeset(changes)
    |> Repo.insert_or_update!
  end

  def users(changes_list) do
    changes_list
    |> Enum.each(fn changes -> user(changes) end)
  end
end

alias Osame.{Seeds, Repo, Country}

countries = [
  %{name: "USA",
    image_url: "/images/flags/United-States-of-America.png"},
  %{name: "Canada",
    image_url: "/images/flags/Canada.png"},
  %{name: "Brazil",
    image_url: "/images/flags/Brazil.png"},
  %{name: "Mexico",
    image_url: "/images/flags/Mexico.png"},
  %{name: "Argentina",
    image_url: "/images/flags/Argentina.png"},
  %{name: "Russia",
    image_url: "/images/flags/Russia.png"},
  %{name: "Germany",
    image_url: "/images/flags/Germany.png"},
  %{name: "Turkey",
    image_url: "/images/flags/Turkey.png"},
  %{name: "France",
    image_url: "/images/flags/France.png"},
  %{name: "UK",
    image_url: "/images/flags/United-Kingdom.png"},
  %{name: "Italy",
    image_url: "/images/flags/Italy.png"},
  %{name: "Spain",
    image_url: "/images/flags/Spain.png"},
  %{name: "Sweden",
    image_url: "/images/flags/Sweden.png"},
  %{name: "Finland",
    image_url: "/images/flags/Finland.png"},
  %{name: "Denmark",
    image_url: "/images/flags/Denmark.png"},
  %{name: "Switzerland",
    image_url: "/images/flags/Switzerland.png"},
  %{name: "Ukraine",
    image_url: "/images/flags/Ukraine.png"},
  %{name: "Poland",
    image_url: "/images/flags/Poland.png"},
  %{name: "Israel",
    image_url: "/images/flags/Israel.png"}
]

Seeds.countries(countries)

if System.argv |> Enum.any?(fn arg -> arg == "dev" end) do
  france = Repo.get_by!(Country, name: "France")
  germany = Repo.get_by!(Country, name: "Germany")

  users = [
    %{name: "user1",
      email: "user1@email.com",
      password: "password",
      country_id: france.id},
    %{name: "user2",
      email: "user2@email.com",
      password: "password",
      country_id: germany.id},
  ]

  Seeds.users(users)
end
