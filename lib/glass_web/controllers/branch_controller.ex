defmodule GlassWeb.BranchController do
  use GlassWeb, :controller

  alias Glass.Events
  alias Glass.Events.Branch

  action_fallback(GlassWeb.FallbackController)

  def index(conn, _params) do
    branches = Events.list_branches()
    render(conn, "index.json", branches: branches)
  end

  def create(conn, %{"branch" => branch_params}) do
    with {:ok, %Branch{} = branch} <- Events.create_branch(branch_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", branch_path(conn, :show, branch))
      |> render("show.json", branch: branch)
    end
  end

  def show(conn, %{"id" => id}) do
    branch = Events.get_branch!(id)
    render(conn, "show.json", branch: branch)
  end

  def update(conn, %{"id" => id, "branch" => branch_params}) do
    branch = Events.get_branch!(id)

    with {:ok, %Branch{} = branch} <- Events.update_branch(branch, branch_params) do
      render(conn, "show.json", branch: branch)
    end
  end

  def delete(conn, %{"id" => id}) do
    branch = Events.get_branch!(id)

    with {:ok, %Branch{}} <- Events.delete_branch(branch) do
      send_resp(conn, :no_content, "")
    end
  end
end
