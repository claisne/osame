
defmodule Osame.Game do
  use GenServer
  require Logger

  alias Osame.Game
  alias Osame.Chess
  alias Osame.GlobalGamesChannel

  @start_timeout 30_000

  defstruct [
    :id,
    :first_country,
    :second_country,
    :state,
    :timestamp,
  ]

  # Client

  def start_link(game) do
    GenServer.start_link(__MODULE__, game)
  end

  def new(first_country, second_country) do
    %Game{id: Osame.Utils.random_string(5),
          first_country: first_country,
          second_country: second_country,
          state: Chess.Game.new(),
          timestamp: :os.system_time(:milli_seconds)}
  end

  # Server

  def init(game) do
    send self(), :after_init
    {:ok, game}
  end

  def handle_info(:after_init, game) do
    schedule_random_move()
    GlobalGamesChannel.broadcast_new_game(game)
    {:noreply, game}
  end

  def handle_info(:random_move, game) do
    schedule_random_move()

    new_game = %{game | state: Chess.Game.random_move(game.state)}
    GlobalGamesChannel.broadcast_game_update(new_game)
    {:noreply, new_game}
  end

  def handle_call(:game, _from, game) do
    {:reply, game, game}
  end

  def handle_call(:countries_playing, _from, game) do
    {:reply, [game.first_country, game.second_country], game}
  end

  defp schedule_random_move do
    Process.send_after(self(), :random_move, 5_000)
  end
end
