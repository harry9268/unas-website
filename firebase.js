// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// ✅ Tu configuración de Firebase REAL
const firebaseConfig = {
  apiKey: "AIzaSyB8zbvMFPshaM2ORDVzy81I1v58t8LJ75s",
  authDomain: "nails--by--vanesa.firebaseapp.com",
  projectId: "nails--by--vanesa",
  storageBucket: "nails--by--vanesa.appspot.com",
  messagingSenderId: "684204986645",
  appId: "1:684204986645:web:9b35c8df7be6a37ccc591c"
};

// ✅ Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Formulario de reseñas
const reseñaForm = document.getElementById('reseñaForm');

reseñaForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value || "Anónimo";
  const estrellas = document.getElementById('estrellas').value;
  const comentario = document.getElementById('comentario').value;
  const fotoFile = document.getElementById('foto').files[0];

  let fotoURL = "";

  if (fotoFile) {
    const storageRef = ref(storage, `reseñas/${fotoFile.name}`);
    await uploadBytes(storageRef, fotoFile);
    fotoURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "reseñas"), {
    nombre,
    estrellas: parseInt(estrellas),
    comentario,
    fotoURL,
    fecha: serverTimestamp()
  });

  alert("✅ ¡Reseña enviada!");
  reseñaForm.reset();
  mostrarReseñas();
});

// ✅ Función para mostrar reseñas
async function mostrarReseñas() {
  const lista = document.getElementById('listaReseñas');
  lista.innerHTML = "";

  const q = query(collection(db, "reseñas"), orderBy("fecha", "desc"));
  const querySnapshot = await getDocs(q);

  let suma = 0;
  let count = 0;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    suma += data.estrellas;
    count++;

    lista.innerHTML += `
      <div class="reseña">
        <h4>${data.nombre}</h4>
        <p>${'⭐️'.repeat(data.estrellas)}</p>
        <p>${data.comentario}</p>
        ${data.fotoURL ? `<img src="${data.fotoURL}" width="120"/>` : ""}
      </div>
      <hr/>
    `;
  });

  const media = count ? (suma / count).toFixed(1) : 0;
  document.getElementById('mediaEstrellas').innerText = `⭐️ Media: ${media}/5`;
}

// ✅ Llamar al cargar
mostrarReseñas();
