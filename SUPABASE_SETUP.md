# Configuración de Supabase para Productos

## 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Puedes encontrar estos valores en tu dashboard de Supabase en Settings > API.

## 2. Crear Tabla de Productos

En Supabase, ve a SQL Editor y ejecuta:

```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('fruits', 'vegetables', 'packaging')),
  intro_description TEXT NOT NULL,
  image_path TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  origin TEXT,
  history TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 3. Insertar Datos de Ejemplo

```sql
INSERT INTO products (name, category, intro_description, image_path, slug, origin, history) VALUES
('Avocado', 'fruits', 'Aguacate fresco de alta calidad', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=800&auto=format&fit=crop', 'avocado', 'México', 'Cultivado desde hace generaciones'),
('Tomatoes', 'vegetables', 'Tomates rojos jugosos y frescos', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop', 'tomatoes', 'Argentina', 'Producción orgánica certificada'),
('Strawberries', 'fruits', 'Fresas dulces de temporada', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=800&auto=format&fit=crop', 'strawberries', 'Chile', 'Seleccionadas a mano'),
('Broccoli', 'vegetables', 'Brócoli orgánico y nutritivo', 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=800&auto=format&fit=crop', 'broccoli', 'Brasil', 'Cultivo sustentable'),
('Carton Boxes', 'packaging', 'Cajas de cartón resistentes', 'https://images.unsplash.com/photo-1605600659873-d808a1d85715?q=80&w=800&auto=format&fit=crop', 'carton-boxes', 'Local', 'Fabricación local con estándares internacionales'),
('Lemons', 'fruits', 'Limones frescos cítricos', 'https://images.unsplash.com/photo-1590502593747-42a996111139?q=80&w=800&auto=format&fit=crop', 'lemons', 'Perú', 'Cosecha mensual de calidad premium');
```

## 4. Habilitar Row Level Security (Opcional pero Recomendado)

Ve a Authentication > Policies y configura las políticas según tus necesidades.

Para permitir solo lectura pública:

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);
```

## 5. Verificar la Conexión

1. Asegúrate de que las variables de entorno están configuradas
2. Inicia el servidor de desarrollo: `npm run dev`
3. La página de Productos debería cargar los datos de Supabase automáticamente

## Estructura de Datos Esperada

El componente espera los siguientes campos en la tabla `products`:

- `id` (número): ID único del producto
- `name` (texto): Nombre del producto (título)
- `category` (texto): Categoría - "fruits", "vegetables" o "packaging" (para filtro)
- `intro_description` (texto): Descripción corta del producto
- `image_path` (texto): URL o ruta de imagen (desde Storage)
- `slug` (texto): Slug único para URL `/product/slug`
- `origin` (texto, opcional): Origen/país del producto (para página de detalles)
- `history` (texto, opcional): Historia del producto (para página de detalles)
