
defmodule Osame.GlobalChatChannel do
  use Osame.Web, :channel

  alias Osame.Endpoint
  alias Osame.ChatMessages
  alias Osame.UsersOnline

  @max_message_size 150
  @users_count_refresh_time 5_000

  def join("global_chat", _payload, socket) do
    send self(), :after_join
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    send_messages(socket)
    send_users_count(socket)
    schedule_users_count_update()
    {:noreply, socket}
  end

  def handle_info(:update_users_count, socket) do
    send_users_count(socket)
    schedule_users_count_update()
    {:noreply, socket}
  end

  def broadcast_message(message) do
    broadcast("messages:new", %{"message" => message})
  end

  def broadcast_users_count do
    users_count = UsersOnline.count()
    broadcast("users_count", %{"users_count" => users_count})
  end

  # Private

  defp send_messages(socket) do
    last_messages = ChatMessages.globals()
    push(socket, "messages", %{"messages" => last_messages})
  end

  defp send_users_count(socket) do
    users_count = UsersOnline.count()
    push(socket, "users_count", %{"users_count" => users_count})
  end

  defp broadcast(event, data) do
    Endpoint.broadcast("global_chat", event, data)
  end

  defp schedule_users_count_update() do
    Process.send_after(self(), :update_users_count, @users_count_refresh_time)
  end
end

