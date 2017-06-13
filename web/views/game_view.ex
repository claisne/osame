
defmodule Osame.GameView do

  alias Osame.Chess

  def game_channel_many(games) do
    games_data = games
    |> Enum.map(fn game ->
         game_channel_view = game_channel(game)
         game_channel_view[:game]
       end)
    %{:games => games_data}
  end

  def game_channel(game) do
    %{:game =>
      %{id: game.id,
        firstCountry: game.first_country,
        secondCountry: game.second_country,
        state: game_state(game.state)}}
  end

  defp game_state(chess_game = %Chess.Game{}) do
    %{fen: Chess.Game.to_fen_string(chess_game),
      lastMove: Chess.Game.last_move_to_long_san_string(chess_game),
      piecesCaptured: chess_game.pieces_captured,
      colorTurn: chess_game.color_turn}
  end
end
