import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'https://reservacampos.onrender.com'

interface Campo {
  id: number
  nome: string
  tipo_grama: string
  preco_hora: number
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [campos, setCampos] = useState<Campo[]>([])
  const [loading, setLoading] = useState(false)
  const [novoNome, setNovoNome] = useState('')
  const [novoTipoGrama, setNovoTipoGrama] = useState('')
  const [novoPreco, setNovoPreco] = useState('')

  const [dataSelecionada, setDataSelecionada] = useState('')
  const [horaSelecionada, setHoraSelecionada] = useState('08:00')
  const [reservas, setReservas] = useState<any[]>([])

  // --- 1. TRAVA DE SEGURANÇA CONTRA TELA BRANCA NO CARREGAMENTO ---
  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser && savedUser !== "undefined" && savedUser !== "null") {
      try {
        const user = JSON.parse(savedUser)
        
        axios.get(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` } 
        })
        .then(response => {
          const dadosUsuarios = response.data?.data || response.data
          if (Array.isArray(dadosUsuarios)) {
            const usuarioAtualizado = dadosUsuarios.find((u: any) => u.email === user.email)
            if (usuarioAtualizado) {
              localStorage.setItem('user', JSON.stringify(usuarioAtualizado))
              setName(usuarioAtualizado?.name || usuarioAtualizado?.email || 'Usuário')
            } else {
              setName(user?.name || user?.email || 'Usuário')
            }
          } else {
            setName(user?.name || user?.email || 'Usuário')
          }
          setIsLoggedIn(true)
        })
        .catch(err => {
          console.error("Erro ao sincronizar usuário:", err)
          setName(user?.name || user?.email || 'Usuário')
          setIsLoggedIn(true)
        })
      } catch (e) {
        console.error("JSON corrompido detectado no LocalStorage. Limpando chaves...", e)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    } else if (savedUser === "undefined" || savedUser === "null") {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }, [])

  const buscarCampos = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/campos`)
      const dadosCampos = response.data?.data || response.data
      setCampos(Array.isArray(dadosCampos) ? dadosCampos : [])
    } catch (error) {
      console.error("Erro ao buscar campos:", error)
    } finally {
      setLoading(false)
    }
  }

  const buscarReservas = async () => {
    try {
      const response = await axios.get(`${API_URL}/reservas`)
      const dadosReservas = response.data?.data || response.data
      setReservas(Array.isArray(dadosReservas) ? dadosReservas : [])
    } catch (error) {
      console.error("Erro ao buscar reservas:", error)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      buscarCampos()
      buscarReservas()
    }
  }, [isLoggedIn])

  // --- Função para Cadastrar Novo Campo (Apenas Admin) ---
  const handleCadastrarCampo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!novoNome || !novoTipoGrama || !novoPreco) return

    const savedUser = localStorage.getItem('user')
    const userObj = savedUser ? JSON.parse(savedUser) : null

    try {
      await axios.post(`${API_URL}/campos`, {
        nome: novoNome,
        tipo_grama: novoTipoGrama,
        preco_hora: Number(novoPreco)
      }, {
        headers: {
          'x-user-role': userObj?.role || 'USER'
        }
      })

      alert('Campo cadastrado com sucesso!')
      setNovoNome('')
      setNovoTipoGrama('')
      setNovoPreco('')
      buscarCampos()
    } catch (error: any) {
      console.error("Erro ao cadastrar campo:", error)
      const msg = error.response?.data?.message || "Erro ao salvar o campo."
      alert(msg)
    }
  }

  // --- Função para Solicitar Reserva ---
  const handleReservar = async (campoId: number, nomeCampo: string) => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) {
      alert("Erro: Usuário não identificado. Faça login novamente.")
      return
    }

    if (!dataSelecionada) {
      alert("Por favor, selecione uma data para a reserva.")
      return
    }

    const user = JSON.parse(savedUser)
    const dataHoraAgendamento = new Date(`${dataSelecionada}T${horaSelecionada}:00`).toISOString()

    try {
      await axios.post(`${API_URL}/reservas`, {
        userId: user.id,
        campoId: campoId,
        dataHora: dataHoraAgendamento
      })

      alert(`🎉 Sucesso! Campo "${nomeCampo}" reservado para o dia ${dataSelecionada.split('-').reverse().join('/')} às ${horaSelecionada}h!`)
      setDataSelecionada('')
      setHoraSelecionada('08:00')
      buscarReservas()
    } catch (error: any) {
      console.error("Erro ao fazer reserva:", error)
      alert("Este horário já está ocupado para este campo. Escolha outro dia ou horário!")
    }
  }

  // --- 2. FLUXO DE LOGIN / CADASTRO DE USUÁRIO COM LEITURA FLEXÍVEL DE RETORNO ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isLogin) {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password })
        
        // Desembrulha a resposta caso os dados venham dentro de uma chave 'data' ou direto na raiz
        const dados = response.data?.data || response.data
        const token = response.data?.access_token || response.data?.token || dados?.access_token

        if (token) {
          localStorage.setItem('token', token)
          
          // Mapeia o usuário retornado ou cria um fallback para evitar quebra do React
          const userObj = dados?.user || (dados?.id ? dados : { email: email, name: email.split('@')[0], role: 'USER' })
          localStorage.setItem('user', JSON.stringify(userObj))
          
          setName(userObj?.name || userObj?.email || 'Usuário')
          setIsLoggedIn(true)
          setPassword('')
        } else {
          alert('Resposta de autenticação inválida do servidor.')
        }
      } else {
        await axios.post(`${API_URL}/users`, { name, email, password })
        alert('Conta criada com sucesso! Faça login para continuar.')
        setName('')
        setEmail('')
        setPassword('')
        setIsLogin(true)
      }
    } catch (err: any) {
      console.error(err)
      const msgErro = err.response?.data?.message || 'Erro na autenticação'
      alert(Array.isArray(msgErro) ? msgErro[0] : msgErro)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setCampos([])
    setReservas([])
    setName('')
    setEmail('')
    setPassword('')
  }

  // --- TELA DO DASHBOARD PRINCIPAL ---
  if (isLoggedIn) {
    const savedUser = localStorage.getItem('user')
    const userObj = savedUser ? JSON.parse(savedUser) : null
    const isAdmin = userObj?.role === 'ADMIN'

    return (
      <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        <nav style={{ backgroundColor: '#ffffff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: 0, color: '#1a1a1a' }}>🏟️ ReservaCampos</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span>Olá, <strong>{name}</strong> {isAdmin && <span style={{ fontSize: '11px', background: '#007bff', color: '#fff', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px' }}>ADMIN</span>}</span>
            <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Sair</button>
          </div>
        </nav>

        <div style={{ 
          padding: '40px', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: isAdmin ? '1fr 2fr' : '1fr', 
          gap: '30px' 
        }}>
          
          {/* Coluna 1: Formulário de Cadastro (Apenas visível se for ADMIN) */}
          {isAdmin && (
            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: 'fit-content' }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>🌱 Cadastrar Novo Campo</h3>
              <form onSubmit={handleCadastrarCampo} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input type="text" placeholder="Nome do Campo" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <input type="text" placeholder="Tipo de Grama" value={novoTipoGrama} onChange={(e) => setNovoTipoGrama(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <input type="number" placeholder="Preço por Hora (R$)" value={novoPreco} onChange={(e) => setNovoPreco(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar no Banco</button>
              </form>
            </div>
          )}

          {/* Coluna 2: Lista de Quadras e Reservas */}
          <div>
            <h3 style={{ color: '#333', marginBottom: '20px', marginTop: 0 }}>Campos Disponíveis para Reserva</h3>
            {loading ? (
              <p>Carregando campos do banco de dados...</p>
            ) : campos.length === 0 ? (
              <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', textAlign: 'center', color: '#666' }}>
                <p>Nenhum campo encontrado no banco de dados.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {campos.map((campo) => (
                  <div key={campo.id} style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '20px', width: isAdmin ? 'calc(50% - 10px)' : 'calc(33.333% - 14px)', minWidth: '280px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ margin: '0 0 10px 0', color: '#111', fontSize: '18px' }}>{campo.nome}</h4>
                      <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>🌱 Gramado: <strong>{campo.tipo_grama}</strong></p>
                      <p style={{ margin: '0 0 20px 0', color: '#28a745', fontSize: '16px', fontWeight: 'bold' }}>R$ {campo.preco_hora.toFixed(2)} / hora</p>
                      
                      {/* Calendário e seletor */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Escolha o Dia:</label>
                        <input type="date" value={dataSelecionada} onChange={(e) => setDataSelecionada(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555', marginTop: '5px' }}>Escolha o Horário:</label>
                        <select value={horaSelecionada} onChange={(e) => setHoraSelecionada(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}>
                          {Array.from({ length: 16 }, (_, i) => {
                            const hora = String(i + 8).padStart(2, '0') + ':00'
                            return <option key={hora} value={hora}>{hora}</option>
                          })}
                        </select>
                      </div>
                    </div>
                    <button onClick={() => handleReservar(campo.id, campo.nome)} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '14px' }}>
                      Reservar Horário
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Listagem Global de Reservas */}
            <h3 style={{ color: '#333', marginTop: '40px', marginBottom: '20px' }}>📅 Agendamentos Solicitados</h3>
            {reservas.length === 0 ? (
              <p style={{ color: '#666' }}>Nenhuma reserva feita ainda.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {reservas.map((res) => (
                  <div key={res.id} style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>🏟️ {res.campo?.nome || 'Campo Excluído'}</strong>
                      <br />
                      <small style={{ color: '#666' }}>
                        Reservado por: <strong>{res.user?.name || res.user?.email || 'Usuário'}</strong> em {new Date(res.data_hora).toLocaleString('pt-BR')}
                      </small>
                    </div>
                    <span style={{ backgroundColor: '#e2f0d9', color: '#385723', padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>Confirmada</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    )
  }

  // --- TELA DE AUTENTICAÇÃO (LOGIN / CADASTRO) ---
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#1a1a1a', margin: '0 0 8px 0' }}>🏟️ ReservaCampos</h2>
          <p style={{ color: '#666', margin: 0 }}>{isLogin ? 'Faça login para reservar sua quadra' : 'Crie sua conta para começar'}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontWeight: 'bold', color: '#444', fontSize: '14px' }}>Nome Completo</label>
              <input type="text" placeholder="Seu Nome" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', boxSizing: 'border-box' }} />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontWeight: 'bold', color: '#444', fontSize: '14px' }}>E-mail</label>
            <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontWeight: 'bold', color: '#444', fontSize: '14px' }}>Senha</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" style={{ marginTop: '10px', backgroundColor: '#007bff', color: 'white', padding: '12px', borderRadius: '6px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px', fontSize: '14px' }}>
          {isLogin ? (
            <>Não tem uma conta? <button onClick={() => setIsLogin(false)} style={{ color: '#007bff', border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontSize: 'inherit', textDecoration: 'underline' }}>Cadastre-se</button></>
          ) : (
            <>Já tem uma conta? <button onClick={() => setIsLogin(true)} style={{ color: '#007bff', border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontSize: 'inherit', textDecoration: 'underline' }}>Faça Login</button></>
          )}
        </p>
      </div>
    </div>
  )
}

export default App