"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, Package, ShieldCheck } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { Product } from "@/content/products";

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(dbAdapter.getProducts());
  };

  const handleCreateNew = () => {
    setFormData({
      id: `prod_${Date.now()}`,
      slug: `nuevo-producto-${Date.now().toString().slice(-4)}`,
      name: "",
      shortDescription: "",
      description: "",
      category: "suplementos",
      priceBob: 150,
      priceBs: 150,
      active: true,
      presentation: "Frasco 60 cápsulas",
      ingredients: ["Vitamina C", "Zinc"],
      benefits: ["Refuerzo inmunológico"],
      badge: "Nuevo",
      packagingPassport: [
        {
          name: "Frasco Principal",
          component: "Frasco Principal",
          material: "PETG / Vidrio Ámbar",
          classification: "Reciclable",
          instructions: "Enjuagar y depositar en punto de retorno Angles.",
        },
      ],
    });
    setIsEditing(true);
    setSelectedProduct(null);
  };

  const handleEdit = (p: Product) => {
    setFormData(p);
    setSelectedProduct(p);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) return;
    dbAdapter.saveProduct(formData as Product);
    setIsEditing(false);
    loadProducts();
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este producto del catálogo?")) return;
    dbAdapter.deleteProduct(id);
    loadProducts();
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2d4231]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4f7f4]">
            Gestión de Productos
          </h1>
          <p className="text-xs sm:text-sm text-[#a3b899] mt-1">
            Administra el catálogo oficial, pasaportes circulares y precios.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#52b788] text-[#0d140e] font-bold text-xs hover:bg-[#74c69d] transition-colors"
        >
          <Plus className="w-4 h-4" /> Agregar Producto
        </button>
      </div>

      {/* Search and Table */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a3b899]" />
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#142317] border border-[#2d4231] rounded-full pl-10 pr-4 py-2 text-xs text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
          />
        </div>

        <div className="bg-[#142317] border border-[#2d4231] rounded-2xl overflow-hidden shadow-lg shadow-black/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0d140e] text-[#a3b899] uppercase tracking-wider border-b border-[#2d4231]">
                <tr>
                  <th className="p-4">Producto</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4">Pasaporte Circular</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d4231]">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#1b3d2b]/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#f4f7f4]">{p.name}</div>
                      <div className="text-[11px] text-[#a3b899] truncate max-w-xs">{p.presentation}</div>
                    </td>
                    <td className="p-4 text-[#a3b899] uppercase font-semibold text-[11px]">
                      {p.category}
                    </td>
                    <td className="p-4 font-bold text-[#52b788]">
                      {p.priceBob} BOB
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#1b3d2b] border border-[#2d5a3f] text-[#74c69d] text-[10px] font-semibold">
                        {p.packagingPassport?.length || 0} componentes
                      </span>
                    </td>
                    <td className="p-4">
                      {p.active ? (
                        <span className="inline-flex items-center gap-1 text-[#52b788] text-[11px] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[#e63946] text-[11px] font-semibold">
                          <XCircle className="w-3.5 h-3.5" /> Inactivo
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-1.5 rounded-lg bg-[#1b3d2b] text-[#52b788] hover:bg-[#2d5a3f] transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg bg-[#2a1818] text-[#e63946] hover:bg-[#3d2020] transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal / Form */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#142317] border border-[#2d4231] rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2d4231]">
              <h2 className="text-xl font-serif font-bold text-[#f4f7f4]">
                {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs text-[#a3b899] hover:text-[#f4f7f4]"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Nombre del Producto</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Slug URL</label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ""}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Categoría</label>
                  <select
                    value={formData.category || "suplementos"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  >
                    <option value="suplementos">Suplementos</option>
                    <option value="funcionales">Funcionales</option>
                    <option value="bienestar">Bienestar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Precio (BOB)</label>
                  <input
                    type="number"
                    required
                    value={formData.priceBob || 0}
                    onChange={(e) => setFormData({ ...formData, priceBob: Number(e.target.value) })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
                <div>
                  <label className="block text-[#a3b899] font-medium mb-1">Presentación</label>
                  <input
                    type="text"
                    value={formData.presentation || ""}
                    onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
                    className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#a3b899] font-medium mb-1">Descripción Corta</label>
                <input
                  type="text"
                  value={formData.shortDescription || ""}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div>
                <label className="block text-[#a3b899] font-medium mb-1">Descripción Completa</label>
                <textarea
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0d140e] border border-[#2d4231] rounded-xl px-3.5 py-2 text-[#f4f7f4] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div className="pt-4 border-t border-[#2d4231] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2 rounded-full bg-[#1b3d2b] text-[#a3b899] font-bold hover:text-[#f4f7f4]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#52b788] text-[#0d140e] font-bold hover:bg-[#74c69d]"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
