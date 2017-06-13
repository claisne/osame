defmodule Osame.Server.CountryControllerTest do
  use Osame.Server.ConnCase

  alias Osame.Server.Country
  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, country_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    country = Repo.insert! %Country{}
    conn = get conn, country_path(conn, :show, country)
    assert json_response(conn, 200)["data"] == %{"id" => country.id,
      "name" => country.name}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, country_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, country_path(conn, :create), country: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Country, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, country_path(conn, :create), country: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    country = Repo.insert! %Country{}
    conn = put conn, country_path(conn, :update, country), country: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Country, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    country = Repo.insert! %Country{}
    conn = put conn, country_path(conn, :update, country), country: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    country = Repo.insert! %Country{}
    conn = delete conn, country_path(conn, :delete, country)
    assert response(conn, 204)
    refute Repo.get(Country, country.id)
  end
end
