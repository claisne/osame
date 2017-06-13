
defmodule Osame.ChatMessage do
  defstruct [:user, :content, :timestamp]

  alias Osame.ChatMessage
  alias Osame.UserView

  def new(user, message) do
    %ChatMessage{
      user: UserView.chat_message(user),
      content: message,
      timestamp: :os.system_time(:milli_seconds)
    }
  end
end

