defmodule GlassWeb.SourceControllerTest do
  use GlassWeb.ConnCase

  alias Glass.Events
  alias Glass.Events.Source

  @create_attrs %{name: "some name"}
  @update_attrs %{name: "some updated name"}
  @invalid_attrs %{name: nil}

  def fixture(:source) do
    {:ok, source} = Events.create_source(@create_attrs)
    source
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all sources", %{conn: conn} do
      conn = get(conn, source_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create source" do
    test "renders source when data is valid", %{conn: conn} do
      conn = post(conn, source_path(conn, :create), source: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, source_path(conn, :show, id))
      assert json_response(conn, 200)["data"] == %{"id" => id, "name" => "some name"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, source_path(conn, :create), source: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update source" do
    setup [:create_source]

    test "renders source when data is valid", %{conn: conn, source: %Source{id: id} = source} do
      conn = put(conn, source_path(conn, :update, source), source: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, source_path(conn, :show, id))
      assert json_response(conn, 200)["data"] == %{"id" => id, "name" => "some updated name"}
    end

    test "renders errors when data is invalid", %{conn: conn, source: source} do
      conn = put(conn, source_path(conn, :update, source), source: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete source" do
    setup [:create_source]

    test "deletes chosen source", %{conn: conn, source: source} do
      conn = delete(conn, source_path(conn, :delete, source))
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, source_path(conn, :show, source))
      end)
    end
  end

  defp create_source(_) do
    source = fixture(:source)
    {:ok, source: source}
  end
end
