
 // ========== CONTROLE DO PAINEL LATERAL ==========
 const menuButton = document.getElementById('menuButton');
 const closeButton = document.getElementById('closeButton');
 const sidePanel = document.getElementById('sidePanel');
 const overlay = document.getElementById('overlay');
 
 if (menuButton && sidePanel && closeButton && overlay) {
     console.log('Elementos do painel encontrados');
     
     menuButton.addEventListener('click', function() {
         sidePanel.style.left = '0';
         overlay.style.display = 'block';
         document.body.style.overflow = 'hidden';
     });
     
     closeButton.addEventListener('click', function() {
         sidePanel.style.left = '-250px';
         overlay.style.display = 'none';
         document.body.style.overflow = '';
     });
     
     overlay.addEventListener('click', function() {
         sidePanel.style.left = '-250px';
         overlay.style.display = 'none';
         document.body.style.overflow = '';
     });
 } else {
     console.error('Erro: Elementos do painel não encontrados');
 }

 // ========== RELÓGIO EM TEMPO REAL ==========
 function atualizarRelogio() {
     const relogioElement = document.getElementById('relogio');
     if (relogioElement) {
         const agora = new Date();
         const horas = agora.getHours().toString().padStart(2, '0');
         const minutos = agora.getMinutes().toString().padStart(2, '0');
         const segundos = agora.getSeconds().toString().padStart(2, '0');
         
         relogioElement.textContent = `${horas}:${minutos}:${segundos}`;
         console.log('Relógio atualizado:', relogioElement.textContent);
     }
 }
 
 // Inicia o relógio
 if (document.getElementById('relogio')) {
     setInterval(atualizarRelogio, 1000);
     atualizarRelogio(); // Chamada inicial
     console.log('Relógio iniciado');
 } else {
     console.error('Erro: Elemento do relógio não encontrado');
 }
 
 // ========== VERIFICAÇÃO DE ELEMENTOS ==========
 console.log('Verificação completa:');
 console.log('- Menu Button:', menuButton);
 console.log('- Side Panel:', sidePanel);
 console.log('- Relógio:', document.getElementById('relogio'));
