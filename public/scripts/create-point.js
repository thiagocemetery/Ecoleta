function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]');

    //API estados
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')

        //Quando voltar da busca
        .then(res => res.json())

        .then(states => {

            //caminhando pela lista de estados
            for (const state of states) {

                //colocando os estados no select em cada option
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        })
}
populateUFs();

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name=state]');

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = '<option value>Selecione a cidade</option>';
    citySelect.disabled = true;

    fetch(url);

        //Quando voltar da busca
        .then(res => res.json())

        .then(cities => {

            //caminhando pela lista de estados
            for (const city of cities) {

                //colocando os estados no select em cada option
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }

            citySelect.disabled = false;

        })
}
document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities);

//itens de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll('.items-grid li');

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('input[name=items]');
let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    //adicionar ou remor uma crasse com javascript
    //add/remove/toggle

    itemLi.classList.toggle('selected');

    const itemId = event.target.dataset.id;

    //verificar se tem itens selecionados
    //pegar itens selecionados
    const arealdySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId;//retorna true ou false 
        return itemFound;
    })

    //se sim: tira-los do vetor
    if (arealdySelected >= 0) {
        // tirar da seleção

        const filteredItems = selectedItems.filter(item => {

            const itemsIsDifferent = item != itemId;

            return itemsIsDifferent;
        })

        selectedItems = filteredItems;

    } else {
        //se não tiver selecionado, adicionar à seleção

        selectedItems.push(itemId);
    }

    console.log(selectedItems);

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;
}
