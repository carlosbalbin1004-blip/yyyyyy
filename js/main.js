
document.addEventListener('DOMContentLoaded', function(){
  // Test form save
  const form = document.getElementById('styleForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = {
        nombre: form.nombre.value,
        ocasiones: form.occasiones.value,
        colores: form.colores.value,
        prioridad: form.prioridad.value,
        presupuesto: form.presupuesto.value,
        talla_arriba: form.talla_arriba.value,
        talla_abajo: form.talla_abajo.value,
        creado: new Date().toISOString()
      };
      const key = 'skiinbox_profiles';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(data);
      localStorage.setItem(key, JSON.stringify(existing));
      const status = document.getElementById('status');
      if(status){ status.textContent='Perfil guardado ✅'; setTimeout(()=> status.textContent='',2400); }
      form.reset();
    });
  }

  // Mock payment modal
  document.querySelectorAll('.subscribe-btn').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const plan = this.dataset.plan;
      const price = this.dataset.price;
      const modal = document.getElementById('payModal');
      modal.querySelector('.plan-name').textContent = plan;
      modal.querySelector('.plan-price').textContent = price;
      modal.style.display='flex';
    });
  });
  const closeBtn = document.getElementById('payClose');
  if(closeBtn) closeBtn.addEventListener('click', ()=> document.getElementById('payModal').style.display='none');
  const payConfirm = document.getElementById('payConfirm');
  if(payConfirm){
    payConfirm.addEventListener('click', ()=>{
      const plan = document.getElementById('payModal').querySelector('.plan-name').textContent;
      const price = document.getElementById('payModal').querySelector('.plan-price').textContent;
      const key = 'skiinbox_payments';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const p = {plan, price, fecha: new Date().toISOString(), id: Math.random().toString(36).slice(2,8)};
      existing.push(p);
      localStorage.setItem(key, JSON.stringify(existing));
      document.getElementById('payModal').style.display='none';
      alert('Pago simulado realizado: ' + p.id);
    });
  }
});
