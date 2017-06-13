
defmodule Osame.Chess.Square do
  alias Osame.Chess.Square

  defstruct [:file, :rank]

  def new(file, rank) do
    %Square{file: file, rank: rank}
  end

  def add(square, {dx, dy}) do
    %Square{
      file: add_file(square.file, dx),
      rank: add_rank(square.rank, dy)
    }
  end

  def add_file(file, dx) do
    int_to_file(file_to_int(file) + dx)
  end

  def add_rank(rank, dy) do
    rank_added = rank + dy
    if rank_added < 1 or rank_added > 8 do
      nil
    else
      rank_added
    end
  end

  def move(nil, _), do: nil

  def move(square = %Square{}, direction) do
    square_moved = square |> Square.add(direction)
    case {square_moved.file, square_moved.rank} do
      {nil, _} -> nil
      {_, nil} -> nil
      _ -> square_moved
    end
  end

  # Utility functions

  def to_position_string(square) do
      Square.file_to_string(square.file) <> Square.rank_to_string(square.rank)
  end

  def to_string(%Square{file: file, rank: rank}) do
    "#{file}#{rank}"
  end

  def parse(string) do
    %Square{
      file: string |> String.slice(0, 1) |> String.to_existing_atom,
      rank: string |> String.slice(1, 1) |> String.to_integer
    }
  end

  def file_to_string(file), do: Atom.to_string(file)
  def rank_to_string(rank), do: Integer.to_string(rank)

  def file_to_int(:a), do: 1
  def file_to_int(:b), do: 2
  def file_to_int(:c), do: 3
  def file_to_int(:d), do: 4
  def file_to_int(:e), do: 5
  def file_to_int(:f), do: 6
  def file_to_int(:g), do: 7
  def file_to_int(:h), do: 8
  def file_to_int(_), do: nil


  def int_to_file(1), do: :a
  def int_to_file(2), do: :b
  def int_to_file(3), do: :c
  def int_to_file(4), do: :d
  def int_to_file(5), do: :e
  def int_to_file(6), do: :f
  def int_to_file(7), do: :g
  def int_to_file(8), do: :h
  def int_to_file(_), do: nil
end
