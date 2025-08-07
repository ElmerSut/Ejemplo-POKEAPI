// Se agrega un 'listener' (escucha) al botón con el ID 'searchButton'.
// Esto espera a que el usuario haga clic en el botón para ejecutar la función 'searchPokemon'.
document.getElementById('searchButton').addEventListener('click', searchPokemon);

// Función que se ejecuta cuando el usuario hace clic en el botón de búsqueda.
function searchPokemon() {
    // Se obtiene el valor del campo de entrada de texto con el ID 'pokemonName'.
    // Luego, se convierte a minúsculas para que la búsqueda no dependa de las mayúsculas/minúsculas.
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    
    // Si no hay un nombre de Pokémon (campo vacío), la función se detiene sin hacer nada.
    if (!pokemonName) return;

    // Se hace una solicitud HTTP a la PokeAPI usando el nombre del Pokémon proporcionado.
    // La URL está formateada con el nombre del Pokémon para obtener información específica de él.
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            // Verificamos si la respuesta fue exitosa (código 200). Si no, lanzamos un error.
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            // Si la respuesta es exitosa, la convertimos en formato JSON para procesarla.
            return response.json();
        })
        .then(data => {
            // Si la solicitud fue exitosa, se llama a la función 'displayPokemonInfo' 
            // para mostrar la información del Pokémon en la página.
            displayPokemonInfo(data);
        })
        .catch(error => {
            // Si hubo algún error (por ejemplo, el Pokémon no se encuentra o hay un error de red),
            // mostramos un mensaje de error dentro del contenedor con el ID 'pokemonInfo'.
            document.getElementById('pokemonInfo').innerHTML = `<p>${error.message}</p>`;
        });
}

// Función que recibe los datos del Pokémon y los muestra en la página.
function displayPokemonInfo(pokemon) {
    // Seleccionamos el contenedor donde se mostrará la información del Pokémon.
    const pokemonInfo = document.getElementById('pokemonInfo');
    
    // Se genera el HTML dinámicamente para mostrar la imagen, nombre, altura, peso y habilidades del Pokémon.
    pokemonInfo.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">  <!-- Imagen del Pokémon -->
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2> <!-- Nombre del Pokémon (con la primera letra en mayúscula) -->
        <p><strong>Altura:</strong> ${pokemon.height} decímetros</p> <!-- Altura del Pokémon -->
        <p><strong>Peso:</strong> ${pokemon.weight} hectogramos</p> <!-- Peso del Pokémon -->
        <p><strong>Habilidades:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p> <!-- Habilidades del Pokémon (en un listado separado por comas) -->
    `;
}
