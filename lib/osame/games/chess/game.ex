
defmodule Osame.Chess.Game do
  alias Osame.Chess.{Game, Board, Piece, Move, Color}

  defstruct [
    :board,
    :color_turn,
    :votes,
    :last_move,
    :pieces_captured,
  ]

  def new do
    %Game{
      board: Board.new(),
      color_turn: :white,
      votes: %{},
      last_move: nil,
      pieces_captured: [],
    }
  end

  def vote(game, user_id, long_san_string) do
    case Move.parse_long_san_string(long_san_string) do
      {:ok, move} -> 
        votes = Map.get_and_update(game.votes, move, fn users ->
          if users = nil do
            MapSet.new([user_id])
          else
            MapSet.put(user_id)
          end
        end)
        %{game | votes: votes}
      {:error, _error} -> game
    end
  end

  def random_move(game) do
    {new_board, move, piece_captured} = Board.apply_random_move(game.board, game.color_turn)

    new_color =
      if game.board == new_board do
        game.color_turn
      else
        Color.opposite_color(game.color_turn)
      end

    new_pieces_captured =
      if piece_captured == nil do
        game.pieces_captured
      else
        [piece_captured|game.pieces_captured]
      end

    %{game | board: new_board,
             last_move: move,
             color_turn: new_color,
             pieces_captured: new_pieces_captured}
  end

  def last_move_to_long_san_string(game) do
    Move.to_long_san_string(game.last_move)
  end

  def to_fen_string(game) do
    board_fen = Board.to_fen_string(game.board)
    color_fen = Color.to_fen_string(game.color_turn)

    Enum.join([board_fen, color_fen, "KQkq", "-", "0", "1"], " ")
  end
end
