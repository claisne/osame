defmodule Osame.Chess.Move do
  alias Osame.Chess.{Square, Move}

  defstruct [
    :from,
    :to,
    :type,
    :captured
  ]

  def parse_long_san_string(string) do
    if Regex.match?(~r/^[a-h][1-8]-[a-h][1-8]$/, string) do
      move = %Move{
        from: string |> String.slice(0, 2) |> Square.parse,
        to:   string |> String.slice(2, 2) |> Square.parse
      }
      {:ok, move}
    else
      {:error, :invalid_format}
    end
  end

  def to_long_san_string(%Move{from: from, to: to}) do
    Square.to_string(from) <> "-" <> Square.to_string(to)
  end

  def to_long_san_string(_), do: nil

  def to_string(%Move{from: from, to: to}) do
    Square.to_string(from) <> Square.to_string(to)
  end
end

