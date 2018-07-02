defmodule GlassWeb.PropertyControllerTest do
  use GlassWeb.ConnCase

  alias Glass.Events
  alias Glass.Events.Property

  @create_attrs %{name: "some name"}
  @update_attrs %{name: "some updated name"}
  @invalid_attrs %{name: nil}

  def fixture(:property) do
    {:ok, property} = Events.create_property(@create_attrs)
    property
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all properties", %{conn: conn} do
      conn = get(conn, property_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create property" do
    test "renders property when data is valid", %{conn: conn} do
      conn = post(conn, property_path(conn, :create), property: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, property_path(conn, :show, id))
      assert json_response(conn, 200)["data"] == %{"id" => id, "name" => "some name"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, property_path(conn, :create), property: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update property" do
    setup [:create_property]

    test "renders property when data is valid", %{
      conn: conn,
      property: %Property{id: id} = property
    } do
      conn = put(conn, property_path(conn, :update, property), property: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, property_path(conn, :show, id))
      assert json_response(conn, 200)["data"] == %{"id" => id, "name" => "some updated name"}
    end

    test "renders errors when data is invalid", %{conn: conn, property: property} do
      conn = put(conn, property_path(conn, :update, property), property: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete property" do
    setup [:create_property]

    test "deletes chosen property", %{conn: conn, property: property} do
      conn = delete(conn, property_path(conn, :delete, property))
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, property_path(conn, :show, property))
      end)
    end
  end

  defp create_property(_) do
    property = fixture(:property)
    {:ok, property: property}
  end
end
