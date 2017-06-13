
defmodule Osame.Chess.Board do
  alias Osame.Chess.{Piece, Square, Move, Color}

  def new do
    white_pieces = create_pieces(:white, 1, 2)
    black_pieces = create_pieces(:black, 8, 7)
    Enum.concat(white_pieces, black_pieces)
  end

  def piece_on(board, square) do
    board
    |> Enum.find(fn piece -> piece.square == square end)
  end

  def piece_on(board, rank, file) do
    square = %Square{file: file, rank: rank}
    piece_on(board, square)
  end

  def empty?(board, square) do
    piece_on(board, square) == nil
  end

  def color?(board, square, color) do
    piece = piece_on(board, square)
    piece != nil and piece.color == color
  end

  def opponent_color?(board, square, color) do
    piece = piece_on(board, square)
    case {piece, color} do
      {nil, _} -> false
      {piece, :white} -> piece.color == :black
      {piece, :black} -> piece.color == :white
    end
  end

  def apply_random_move(board, color) do
    moves = moves(board, color)
    if Enum.count(moves) > 0 do
      [random_move] = Enum.take_random(moves, 1)
      apply_move(board, random_move)
    else
      {board, nil, nil}
    end
  end

  def apply_move(board, move) do
    piece_captured = piece_on(board, move.to)
    piece_to_move = piece_on(board, move.from)
    piece_moved = piece_to_move |> Piece.move(move.to)

    board_cleaned = Enum.reject(board, fn piece ->
      piece == piece_captured or piece == piece_to_move
    end)

    new_board = [piece_moved | board_cleaned]

    {new_board, move, piece_captured}
  end

  def moves(board, color, legal \\ true) do
    all_moves = board
    |> pieces_of_color(color)
    |> Enum.map(fn piece -> piece_moves(board, piece) end)
    |> Enum.concat

    if legal do
      all_moves
      |> Enum.reject(fn move ->
        {new_board, _move, _piece_captured} = apply_move(board, move)
        in_check?(new_board, color)
      end)
    else
      all_moves
    end
  end

  def pieces_of_color(board, color) do
    board
    |> Enum.filter(fn(piece) -> piece.color == color end)
  end

  defp piece_moves(board, piece) do
    squares = piece_squares(board, piece)

    squares
    |> Enum.map(fn to_square ->
      piece_captured = piece_on(board, to_square)
      if piece_captured == nil do
        %Move{
          from: piece.square,
          to: to_square,
          type: :normal,
        }
      else
        %Move{
          from: piece.square,
          to: to_square,
          type: :capture,
          captured: piece_captured.type,
        }
      end
    end)
  end

  def piece_squares(board, pawn = %Piece{type: :pawn}) do
    dy = Piece.forward(pawn.color)

    squares = [
      pawn.square |> Square.move({0, dy})  |> if_empty(board)
                  |> Square.move({0, dy})  |> if_empty(board) |> if_first_pawn_move(pawn),
      pawn.square |> Square.move({0, dy})  |> if_empty(board),
      pawn.square |> Square.move({-1, dy}) |> if_opponent(pawn.color, board),
      pawn.square |> Square.move({1, dy})  |> if_opponent(pawn.color, board)
    ]

    squares
    |> Enum.reject(fn square -> square == nil end)
  end

  def piece_squares(board, piece = %Piece{}) do
    case Piece.direction_length(piece.type) do
      :simple -> piece_simple_squares(board, piece)
      :long -> piece_long_squares(board, piece)
    end
  end

  def piece_simple_squares(board, piece) do
    piece
    |> Piece.directions
    |> Enum.map(fn direction -> Square.move(piece.square, direction) end)
    |> Enum.reject(fn square -> square == nil end)
    |> Enum.reject(fn square -> color?(board, square, piece.color) end)
  end

  def piece_long_squares(board, piece) do
    piece
    |> Piece.directions
    |> Enum.map(fn direction -> explore_direction(board, direction, piece.square, piece.color) end)
    |> Enum.concat
  end

  def pieces_of_type(board, color, type) do
    board
    |> Enum.filter(fn piece -> piece.color == color and piece.type == type end)
  end

  def find_king(board, color) do
    board
    |> Enum.find(fn piece -> piece.color == color and piece.type == :king end)
  end

  def in_check?(board, color) do
    king = find_king(board, color)
    moves = moves(board, Color.opposite_color(color), false)

    move_on_king = moves |> Enum.find(fn move -> move.to == king.square end)
    move_on_king != nil
  end

  defp can_castle?(board, color, rook_rank, path) do
    rook = piece_on(board, %Square{rank: rook_rank, file: first_file(color)})
    king = find_king(board, color)

    if rook == nil or rook.has_moved == true or king.has_moved == true do
      false
    else
      path_clear = 
        Enum.all?(path, fn file ->
          empty?(board, %Square{file: file, rank: first_file(color)})
        end)

      in_check = in_check?(board, color)

      path_clear and not in_check
    end
  end

  def can_castle_left?(board, color) do
    can_castle?(board, color, :a, [:b, :c, :d])
  end

  def can_castle_right?(board, color) do
    can_castle?(board, color, :h, [:f, :g])
  end

  def first_file(:white), do: 1
  def first_file(:black), do: 8

  def parse(string) do
    string
    |> String.split
    |> Enum.map(fn piece_string -> Piece.parse(piece_string) end)
  end

  def to_string(board) do
    files_string = "    a  b  c  d  e  f  g  h"
    edge_string  = "    -- -- -- -- -- -- -- --"

    result = 8..1
    |> Enum.map(fn rank -> rank_to_string(board, rank) end)
    |> Enum.join("\n")

    [files_string, edge_string, result, edge_string, files_string, ""]
    |> Enum.join("\n")
  end

  def to_position_string(board) do
    board
    |> Enum.map(fn piece ->
      {Square.to_position_string(piece.square), Piece.to_position_string(piece)}
    end)
    |> Enum.into(%{})
  end

  def to_fen_string(board) do
    to_fen_string(board, 8, :a, 0, "")
  end

  defp to_fen_string(board, rank, file, empty_acc, fen) do
    piece = piece_on(board, rank, file)

    new_fen = 
      if piece != nil do
        if empty_acc == 0 do
          fen <> Piece.to_fen_string(piece)
        else
          fen <> Integer.to_string(empty_acc) <> Piece.to_fen_string(piece)
        end
      else
        fen
      end

    new_empty_acc = if piece == nil do empty_acc + 1 else 0 end

    case {rank, file} do
      {1, :h} ->
        if new_empty_acc != 0 do
          new_fen <> Integer.to_string(empty_acc + 1)
        else
          new_fen
        end
      {rank, :h} ->
        new_file = :a
        new_rank = Square.add_rank(rank, -1)

        fen_with_empty_left = if new_empty_acc != 0 do
            new_fen <> Integer.to_string(empty_acc + 1)
          else
            new_fen
          end

        to_fen_string(board, new_rank, new_file, 0, fen_with_empty_left <> "/")
      {rank, file} ->
        new_file = Square.add_file(file, 1)
        new_rank = rank

        to_fen_string(board, new_rank, new_file, new_empty_acc, new_fen)
    end
  end

  # Private Functions

  defp files do
    ?a..?h
    |> Enum.map(fn code -> List.to_existing_atom([code]) end)
  end

  defp if_empty(nil, _), do: nil

  defp if_empty(square, board) do
    case piece_on(board, square) do
      nil -> square
      _   -> nil
    end
  end

  defp if_opponent(nil, _, _), do: nil

  defp if_opponent(square = %Square{}, color, board) do
    case piece_on(board, square) do
      nil                   -> nil
      %Piece{color: ^color} -> nil
      _                     -> square
    end
  end

  defp if_first_pawn_move(nil, _), do: nil

  defp if_first_pawn_move(square, piece) do
    case piece.has_moved == false do
      true -> square
      _    -> nil
    end
  end

  defp explore_direction(board, direction, square, color) do
    explore_direction(board, direction, square, color, [])
  end

  defp explore_direction(board, direction, square, color, result) do
    next_square = Square.move(square, direction)

    opponent_color = Color.opposite_color(color)

    case {next_square, piece_on(board, next_square)} do
      {nil, _} -> result
      {_, nil} -> explore_direction(board, direction, next_square, color, [next_square | result])
      {_, %Piece{color: ^color}} -> result
      {_, %Piece{color: ^opponent_color}} -> [next_square | result]
    end
  end

  # Board creation
  defp create_pieces(color, back_rank, front_rank) do
    Enum.concat(create_backrow(color, back_rank), create_pawns(color, front_rank))
  end

  defp create_pawns(color, rank) do
    files()
    |> Enum.map(fn file -> Piece.new(color, :pawn, Square.new(file, rank)) end)
  end

  defp create_backrow(color, rank) do
    [
      Piece.new(color, :rook,   Square.new(:a, rank)),
      Piece.new(color, :knight, Square.new(:b, rank)),
      Piece.new(color, :bishop, Square.new(:c, rank)),
      Piece.new(color, :queen,  Square.new(:d, rank)),
      Piece.new(color, :king,   Square.new(:e, rank)),
      Piece.new(color, :bishop, Square.new(:f, rank)),
      Piece.new(color, :knight, Square.new(:g, rank)),
      Piece.new(color, :rook,   Square.new(:h, rank)),
    ]
  end

  defp rank_to_string(board, rank) do
    squares =
      files
      |> Enum.map(fn file -> piece_on(board, Square.new(file, rank)) end)
      |> Enum.map(fn piece -> Piece.to_string(piece) end)
      |> Enum.join(" ")

    [rank, squares, rank]
    |> Enum.join(" | ")
  end
end
