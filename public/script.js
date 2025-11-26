// Cargar datos si se está editando
window.addEventListener('DOMContentLoaded', () => {
  const datos = localStorage.getItem('equipoEditar');
  if (datos) {
    const { equipo } = JSON.parse(datos);
    for (const [clave, valor] of Object.entries(equipo)) {
      const campo = document.querySelector(`[name="${clave}"]`);
      if (campo && campo.type !== 'file') {
        campo.value = valor;
      }
    }
  }
});
document.getElementById('btnLimpiar').addEventListener('click', () => {
  document.getElementById('inventoryForm').reset();
  localStorage.removeItem('equipoEditar');

  const fotoPrev = document.getElementById('fotoActual');
  if (fotoPrev) {
    fotoPrev.innerHTML = '';
  }
});

// Enviar formulario: nuevo equipo o edición
document.getElementById('inventoryForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const editarData = localStorage.getItem('equipoEditar');
  const isEdit = editarData !== null;

  const url = isEdit
    ? `/api/equipos/${JSON.parse(editarData).index}`
    : '/api/equipos';

  const method = isEdit ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    body: formData
  });

  if (res.ok) {
    alert(isEdit ? "Equipo actualizado correctamente" : "Equipo registrado correctamente");
    localStorage.removeItem('equipoEditar');
    form.reset();
  } else {
    alert("Error al guardar el equipo");
  }
});
