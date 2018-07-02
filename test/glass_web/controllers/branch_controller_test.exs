defmodule GlassWeb.BranchControllerTest do
  use GlassWeb.ConnCase

  alias Glass.Events
  alias Glass.Events.Branch

  @create_attrs %{name: "some name"}
  @update_attrs %{name: "some updated name"}
  @invalid_attrs %{name: nil}

  def fixture(:branch) do
    {:ok, branch} = Events.create_branch(@create_attrs)
    branch
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all branches", %{conn: conn} do
      conn = get(conn, branch_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create branch" do
    test "renders branch when data is valid", %{conn: conn} do
      conn = post(conn, branch_path(conn, :create), branch: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, branch_path(conn, :show, id))
      assert json_response(conn, 200)["data"] == %{"id" => id, "name" => "some name"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, branch_path(conn, :create), branch: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update branch" do
    setup [:create_branch]

    test "renders branch when data is valid", %{conn: conn, branch: %Branch{id: id} = branch} do
      conn = put(conn, branch_path(conn, :update, branch), branch: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, branch_path(conn, :show, id))
      assert json_response(conn, 200)["data"] == %{"id" => id, "name" => "some updated name"}
    end

    test "renders errors when data is invalid", %{conn: conn, branch: branch} do
      conn = put(conn, branch_path(conn, :update, branch), branch: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete branch" do
    setup [:create_branch]

    test "deletes chosen branch", %{conn: conn, branch: branch} do
      conn = delete(conn, branch_path(conn, :delete, branch))
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, branch_path(conn, :show, branch))
      end)
    end
  end

  defp create_branch(_) do
    branch = fixture(:branch)
    {:ok, branch: branch}
  end
end
