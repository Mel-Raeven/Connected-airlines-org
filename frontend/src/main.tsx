import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme='light'>
    <ModalsProvider>
    <App />
    </ModalsProvider>
  </MantineProvider>,
)
