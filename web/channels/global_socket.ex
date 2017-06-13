defmodule Osame.GlobalSocket do
  use Phoenix.Socket

  alias Osame.UsersOnline

  ## Channels
  channel "global_chat", Osame.GlobalChatChannel
  channel "global_games:*", Osame.GlobalGamesChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    UsersOnline.add(socket)
    {:ok, socket}
  end

  def id(_socket), do: nil 
end
