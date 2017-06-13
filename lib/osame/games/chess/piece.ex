
defmodule Osame.Chess.Piece do
  alias Osame.Chess.{Piece, Square}

  defstruct [:color, :type, :square, :has_moved]

  # Piece creation
  def new(color, type) do
    %Piece{
      color: color,
      type: type,
      has_moved: false
    }
  end

  def new(color, type, square) do
    %Piece{
      color: color,
      type: type,
      square: square,
      has_moved: false
    }
  end

  def move(piece, square) do
    %{piece | square: square, has_moved: true}
  end

  # Piece forward given the color
  def forward(:black), do: -1
  def forward(:white), do: 1

  # Piece directions
  # Returns a list of possible squares, without knowing the board state
  defp all_directions do
    for x <- -1..1, y <- -1..1, fn direction -> direction != {0, 0} end, do: {x, y}
  end

  def directions(%Piece{type: :rook}) do
    for x <- [0, 1], s <- [1, -1], do: {x * s, (1 - x) * s}
  end

  def directions(%Piece{type: :knight}) do
    for x <- [1, 2], y <- [1, -1], z <- [1, -1], do: {x * y, (3 - x) * z}
  end

  def directions(%Piece{type: :bishop}) do
    for x <- [1, -1], y <- [1, -1], do: {x, y}
  end

  def directions(%Piece{type: :queen}) do
    all_directions()
  end

  def directions(%Piece{type: :king}) do
    all_directions()
  end

  # Piece direction length
  # ie is it a long direction (queen for ex) or short (king for ex)
  def direction_length(:rook), do: :long
  def direction_length(:knight), do: :simple
  def direction_length(:bishop), do: :long
  def direction_length(:queen), do: :long
  def direction_length(:king), do: :simple

  # Utility functions

  def parse(string) do
    [[_, color, type, file_rank, has_moved]] = Regex.scan ~r/([BW])(.)([a-h][1-8])([+-]?)/, string

    %Piece{
      color: parse_color(color),
      type: parse_type(type),
      square: Square.parse(file_rank),
      has_moved: has_moved == "+"
    }
  end

  def parse_color("b"), do: :black
  def parse_color("B"), do: :black
  def parse_color("w"), do: :white
  def parse_color("W"), do: :white

  def color_to_string(:black), do: "b"
  def color_to_string(:white), do: "w"

  def parse_type("P"), do: :pawn
  def parse_type("R"), do: :rook
  def parse_type("N"), do: :knight
  def parse_type("B"), do: :bishop
  def parse_type("Q"), do: :queen
  def parse_type("K"), do: :king

  def to_position_string(piece) do
      Piece.color_to_string(piece.color) <> Piece.to_type_string(piece)
  end

  def to_type_string(%Piece{type: :pawn}), do: "P"
  def to_type_string(%Piece{type: :rook}), do: "R"
  def to_type_string(%Piece{type: :knight}), do: "N"
  def to_type_string(%Piece{type: :bishop}), do: "B"
  def to_type_string(%Piece{type: :queen}), do: "Q"
  def to_type_string(%Piece{type: :king}), do: "K"

  def to_string(nil), do: ".."
  def to_string(%Piece{color: :black, type: :pawn}), do: "♙ "
  def to_string(%Piece{color: :black, type: :rook}), do: "♖ "
  def to_string(%Piece{color: :black, type: :knight}), do: "♘ "
  def to_string(%Piece{color: :black, type: :bishop}), do: "♗ "
  def to_string(%Piece{color: :black, type: :queen}), do: "♕ "
  def to_string(%Piece{color: :black, type: :king}), do: "♔ "
  def to_string(%Piece{color: :white, type: :pawn}), do: "♟ "
  def to_string(%Piece{color: :white, type: :rook}), do: "♜ "
  def to_string(%Piece{color: :white, type: :knight}), do: "♞ "
  def to_string(%Piece{color: :white, type: :bishop}), do: "♝ "
  def to_string(%Piece{color: :white, type: :queen}), do: "♛ "
  def to_string(%Piece{color: :white, type: :king}), do: "♚ "

  def to_fen_string(%Piece{color: :black, type: :pawn}), do: "p"
  def to_fen_string(%Piece{color: :black, type: :rook}), do: "r"
  def to_fen_string(%Piece{color: :black, type: :knight}), do: "n"
  def to_fen_string(%Piece{color: :black, type: :bishop}), do: "b"
  def to_fen_string(%Piece{color: :black, type: :queen}), do: "q"
  def to_fen_string(%Piece{color: :black, type: :king}), do: "k"
  def to_fen_string(%Piece{color: :white, type: :pawn}), do: "P"
  def to_fen_string(%Piece{color: :white, type: :rook}), do: "R"
  def to_fen_string(%Piece{color: :white, type: :knight}), do: "N"
  def to_fen_string(%Piece{color: :white, type: :bishop}), do: "B"
  def to_fen_string(%Piece{color: :white, type: :queen}), do: "Q"
  def to_fen_string(%Piece{color: :white, type: :king}), do: "K"
end
