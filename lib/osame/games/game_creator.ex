
defmodule Osame.GameCreator do
  use GenServer

  alias Osame.CountriesOnline
  alias Osame.GameSupervisor

  @refresh_time 5_000

  # Client

  def start_link() do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  # Server

  def init([]) do
    send self(), :after_join
    {:ok, []}
  end

  def handle_info(:after_join, state) do
    create_fake_games(5)
    schedule_game_creation()
    {:noreply, state}
  end

  def handle_info(:game_creation, state) do
    create_games()
    schedule_game_creation()
    {:noreply, state}
  end

  defp create_fake_games(n_games) do
    countries = Osame.Repo.all(Osame.Country)
    for _n <- 1..n_games do
      [first_country, second_country] = Enum.take_random(countries, 2)
      GameSupervisor.create_game(first_country.id, second_country.id)
      :timer.sleep(5000)
    end
  end

  defp create_games do
    countries_online = MapSet.new(CountriesOnline.online())
    countries_playing = MapSet.new(GameSupervisor.countries_playing())
    countries_ready = MapSet.difference(countries_online, countries_playing)

    matchups = create_matchups(countries_ready)
    Enum.map(matchups, fn [first_country, second_country] ->
      GameSupervisor.create_game(first_country, second_country)
    end)
  end

  defp create_matchups(countries_ready) do
    if Enum.count(countries_ready) >= 2 do
      [Enum.take_random(countries_ready, 2)]
    else
      []
    end
  end

  defp schedule_game_creation() do
    Process.send_after(self(), :game_creation, @refresh_time)
  end
end
