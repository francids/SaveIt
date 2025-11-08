import { useState } from "react";
import { useAuth } from "./AuthProvider";

type ItemType = "note" | "link";

interface SavedItem {
  id: string;
  type: ItemType;
  content: string;
  createdAt: Date;
}

export default function AppPage() {
  const { logout } = useAuth();
  const [items, setItems] = useState<SavedItem[]>([]);
  const [newContent, setNewContent] = useState("");
  const [selectedType, setSelectedType] = useState<ItemType>("note");

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newContent.trim()) return;

    const newItem: SavedItem = {
      id: Date.now().toString(),
      type: selectedType,
      content: newContent,
      createdAt: new Date(),
    };

    setItems([newItem, ...items]);
    setNewContent("");
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Stash</a>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-soft btn-accent"
            onClick={async function () {
              await logout();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto p-4 max-w-4xl">
        {/* Add new item form */}
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body">
            <h2 className="card-title">Add New Item</h2>
            <form onSubmit={handleAdd}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Type</span>
                </label>
                <select
                  className="select select-bordered w-full mb-3"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as ItemType)}
                >
                  <option value="note">Note</option>
                  <option value="link">Link</option>
                </select>
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder={
                    selectedType === "note"
                      ? "Write your note here..."
                      : "Paste your link here..."
                  }
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={3}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Save
              </button>
            </form>
          </div>
        </div>

        {/* Items list */}
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="alert">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              <span>No items saved yet. Start by adding a note or link!</span>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`badge ${
                            item.type === "note"
                              ? "badge-primary"
                              : "badge-secondary"
                          }`}
                        >
                          {item.type === "note" ? "Note" : "Link"}
                        </div>
                        <span className="text-xs text-base-content/60">
                          {item.createdAt.toLocaleString()}
                        </span>
                      </div>
                      {item.type === "link" ? (
                        <a
                          href={item.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-primary break-all"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="whitespace-pre-wrap">{item.content}</p>
                      )}
                    </div>
                    <button
                      className="btn btn-ghost btn-sm btn-circle"
                      onClick={() => handleDelete(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
