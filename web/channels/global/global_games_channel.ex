
defmodule Osame.GlobalGamesChannel do
  use Osame.Web, :channel

  alias Osame.Endpoint
  alias Osame.GameSupervisor
  alias Osame.GameView

  def join("global_games:lobby", _payload, socket) do
    send self(), :after_join
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    send_games(socket)
    {:noreply, socket}
  end

  def broadcast_new_game(game) do
    broadcast_lobby("games:new", GameView.game_channel(game))
  end

  def broadcast_game_update(game) do
    broadcast_lobby("games:update", GameView.game_channel(game))
  end

  def broadcast_game_ready(game_id) do
    broadcast_lobby("games:ready", %{"gameId" => game_id})
  end

  defp broadcast_lobby(event, msg) do
    Endpoint.broadcast("global_games:lobby", event, msg)
  end

  defp send_games(socket) do
    games = GameSupervisor.games()
    push(socket, "games", GameView.game_channel_many(games))
  end
end
