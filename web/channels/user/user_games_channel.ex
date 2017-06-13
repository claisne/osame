

defmodule Osame.UserGameChannel do
  use Osame.Web, :channel

  def join("user_games:" <> _game_id, _payload, socket) do
      {:ok, socket}
  end

  def join(_topic, _payload, _socket) do
    {:error, "Bad Channel"}
  end

  def handle_in("vote:new", %{"vote" => vote}, socket) do
    user = socket.assigns[:user]
    {:noreply, socket}
  end
end

