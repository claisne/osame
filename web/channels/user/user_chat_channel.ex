
defmodule Osame.UserChatChannel do
  use Osame.Web, :channel

  alias Osame.GlobalChatChannel
  alias Osame.ChatMessages

  def join("user_chat:global", _payload, socket) do
      {:ok, socket}
  end

  def join("user_chat:country:" <> country_id, _payload, socket) do
    user = socket.assigns[:user]
    {country_id, _binary} = Integer.parse(country_id)

    if user.country_id == country_id do
      {:ok, socket}
    else
      {:error, "Bad Channel"}
    end
  end

  def join(_topic, _payload, _socket) do
    {:error, "Bad Channel"}
  end

  def handle_in("message:new", %{"message" => message}, socket) do
    user = socket.assigns[:user]
    ChatMessages.new_global(user, message)
    {:noreply, socket}
  end
end

