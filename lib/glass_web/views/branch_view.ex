defmodule GlassWeb.BranchView do
  use GlassWeb, :view
  alias GlassWeb.BranchView

  def render("index.json", %{branches: branches}) do
    %{data: render_many(branches, BranchView, "branch.json")}
  end

  def render("show.json", %{branch: branch}) do
    %{data: render_one(branch, BranchView, "branch.json")}
  end

  def render("branch.json", %{branch: branch}) do
    %{id: branch.id, name: branch.name}
  end
end
