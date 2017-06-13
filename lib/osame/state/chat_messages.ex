
defmodule Osame.ChatMessages do
  use GenServer

  @max_messages 100
  @max_message_size 150

  alias Osame.ChatMessage
  alias Osame.GlobalChatChannel

  ## Client
  def start_link do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def new_global(user, message) do
    if message_valid?(message) do
      chat_message = ChatMessage.new(user, message)
      GenServer.call(__MODULE__, {:add_global, chat_message})
      GlobalChatChannel.broadcast_message(chat_message)
    end
  end

  def globals do
    GenServer.call(__MODULE__, :get_globals)
  end

  # def new_country(user, message, :global) do
  # end

  # def new_country(user, message, :country) do
  # end

  # def get_country(country_id, :global) do
  # end

  # def get_country(country_id, :country) do
  # end

  ## Server

  def init([]) do
    {:ok, %{global: {0, []}, countries: %{}}}
  end

  def handle_call({:add_global, message}, _from, state) do
    {count, messages} = state.global

    new_global =
      if count >= @max_messages do
        {count, [message|messages] |> Enum.drop(count - @max_messages + 1)}
      else
        {count + 1, [message|messages]}
      end

    {:reply, :ok, %{state|global: new_global}}
  end

  def handle_call(:get_globals, _from, state) do
    {_count, messages} = state.global
    {:reply, messages, state}
  end

  defp message_valid?(message) do
    message_size = byte_size(message)
    message_size > 0 and message_size <= @max_message_size
  end
end
