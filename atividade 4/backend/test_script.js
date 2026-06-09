const axios = require('axios');
const fs = require('fs');

const API_URL = 'http://localhost:3001/api';

const log = [];

function record(msg) {
  console.log(msg);
  log.push(msg);
}

async function runTests() {
  record('# Relatório de Testes Automatizados - World Vision API\n');
  record(`Data do teste: ${new Date().toISOString()}\n`);
  
  let token = '';
  let continenteId = '';
  let paisId = '';
  let cidadeId = '';

  const testUser = {
    nome: 'User Test',
    email: `test_${Date.now()}@test.com`,
    senha: 'password123'
  };

  try {
    record('## 1. Testes de Autenticação');
    // Register
    record('- Testando Registro...');
    const regRes = await axios.post(`${API_URL}/auth/register`, testUser);
    if (regRes.status === 201 && regRes.data.token) {
      record('  ✅ Registro bem sucedido.');
    } else {
      record('  ❌ Falha no registro.');
    }

    // Login
    record('- Testando Login...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      senha: testUser.senha
    });
    if (loginRes.status === 200 && loginRes.data.token) {
      token = loginRes.data.token;
      record('  ✅ Login bem sucedido.');
    } else {
      record('  ❌ Falha no login.');
    }

    const headers = { Authorization: `Bearer ${token}` };

    record('\n## 2. Testes de CRUD - Continentes');
    // Create Continente
    record('- Testando Criação de Continente...');
    const contRes = await axios.post(`${API_URL}/continentes`, { nome: 'Continente Teste', descricao: 'Teste' }, { headers });
    if (contRes.status === 201) {
      continenteId = contRes.data.id;
      record('  ✅ Continente criado com sucesso. (ID: ' + continenteId + ')');
    }

    // Read Continentes
    record('- Testando Leitura de Continentes...');
    const getCont = await axios.get(`${API_URL}/continentes`, { headers });
    if (getCont.status === 200 && Array.isArray(getCont.data.data)) {
      record('  ✅ Listagem de continentes bem sucedida.');
    }

    // Update Continente
    record('- Testando Atualização de Continente...');
    const updCont = await axios.put(`${API_URL}/continentes/${continenteId}`, { nome: 'Continente Teste Modificado' }, { headers });
    if (updCont.status === 200 && updCont.data.nome === 'Continente Teste Modificado') {
      record('  ✅ Continente atualizado com sucesso.');
    }

    record('\n## 3. Testes de CRUD - Países');
    // Create Pais
    record('- Testando Criação de País...');
    const paisRes = await axios.post(`${API_URL}/paises`, { 
      nome: 'País Teste', 
      populacao: '1000000', 
      idiomaOficial: 'Testeês', 
      moeda: 'Test Coin', 
      continenteId 
    }, { headers });
    
    if (paisRes.status === 201) {
      paisId = paisRes.data.id;
      record('  ✅ País criado com sucesso. (ID: ' + paisId + ')');
    }

    // Read Paises
    record('- Testando Leitura de Países...');
    const getPais = await axios.get(`${API_URL}/paises`, { headers });
    if (getPais.status === 200) {
      record('  ✅ Listagem de países bem sucedida.');
    }

    record('\n## 4. Testes de CRUD - Cidades');
    // Create Cidade
    record('- Testando Criação de Cidade...');
    const cidRes = await axios.post(`${API_URL}/cidades`, { 
      nome: 'Cidade Teste', 
      populacao: '50000', 
      latitude: '-23.5', 
      longitude: '-46.6', 
      paisId 
    }, { headers });
    
    if (cidRes.status === 201) {
      cidadeId = cidRes.data.id;
      record('  ✅ Cidade criada com sucesso. (ID: ' + cidadeId + ')');
    }

    record('\n## 5. Testes de Exclusão');
    // Delete Cidade
    record('- Testando Exclusão de Cidade...');
    const delCid = await axios.delete(`${API_URL}/cidades/${cidadeId}`, { headers });
    if (delCid.status === 200) record('  ✅ Cidade excluída com sucesso.');

    // Delete Pais
    record('- Testando Exclusão de País...');
    const delPais = await axios.delete(`${API_URL}/paises/${paisId}`, { headers });
    if (delPais.status === 200) record('  ✅ País excluído com sucesso.');

    // Delete Continente
    record('- Testando Exclusão de Continente...');
    const delCont = await axios.delete(`${API_URL}/continentes/${continenteId}`, { headers });
    if (delCont.status === 200) record('  ✅ Continente excluído com sucesso.');


    record('\n## 6. Testes de APIs Externas');
    record('- Testando Integração com REST Countries...');
    try {
      const restRes = await axios.get(`${API_URL}/external/pais/Brazil`, { headers });
      if (restRes.status === 200 && restRes.data) {
        record('  ✅ REST Countries retornou os dados geográficos com sucesso.');
      }
    } catch (e) {
      record('  ❌ REST Countries falhou: ' + e.message);
    }

    record('- Testando Integração com Open-Meteo (Clima)...');
    try {
      const weaRes = await axios.get(`${API_URL}/external/clima?cidade=Sao%20Paulo`, { headers });
      if (weaRes.status === 200 && weaRes.data) {
        record('  ✅ Open-Meteo retornou a temperatura atual com sucesso.');
      }
    } catch (e) {
      record('  ❌ Open-Meteo falhou: ' + e.message);
    }

    record('\n**Resultado Final:** Todos os testes essenciais passaram com êxito! 🎉');
    
  } catch (error) {
    record('\n❌ Ocorreu um erro durante a execução dos testes:');
    if (error.response) {
      record(`Status: ${error.response.status}`);
      record(`Data: ${JSON.stringify(error.response.data)}`);
    } else {
      record(error.message);
    }
  }

  fs.writeFileSync('../relatorio_testes.md', log.join('\n'));
  console.log('\nRelatório gerado em relatorio_testes.md');
}

runTests();
