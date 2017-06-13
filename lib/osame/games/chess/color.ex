
defmodule Osame.Chess.Color do
  def opposite_color(:white), do: :black
  def opposite_color(:black), do: :white

  def to_fen_string(:white), do: "w"
  def to_fen_string(:black), do: "b"
end
