defmodule Osame.UserSocket do
  use Phoenix.Socket
  import Guardian.Phoenix.Socket

  alias Osame.UserView
  alias Osame.CountriesOnline

  ## Channels
  channel "user_chat:*", Osame.UserChatChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket

  def connect(%{"token" => token}, socket) do
    case sign_in(socket, token) do
      {:ok, authed_socket, _guardian_params} -> 
        user = current_resource(authed_socket)
        user_socket = assign(socket, :user, UserView.socket_assign(user))
        CountriesOnline.add(user_socket)
        {:ok, user_socket}
      _ -> :error
    end
  end

  def connect(_params, _socket) do
    :error
  end

  def id(socket), do: "users_socket:#{socket.assigns[:user].id}"
end
