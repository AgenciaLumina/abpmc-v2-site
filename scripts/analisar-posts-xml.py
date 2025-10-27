#!/usr/bin/env python3
"""
Analisa todos os arquivos XML de posts do WordPress
para contar posts e categorias
"""

import xml.etree.ElementTree as ET
import os
from collections import defaultdict

# Diretório com os XMLs
xml_dir = "/Users/paulomedeiros/CascadeProjects/posts xml abpmc"

# Namespaces do WordPress
namespaces = {
    'wp': 'http://wordpress.org/export/1.2/',
    'content': 'http://purl.org/rss/1.0/modules/content/',
    'dc': 'http://purl.org/dc/elements/1.1/',
    'excerpt': 'http://wordpress.org/export/1.2/excerpt/'
}

def contar_posts_por_arquivo():
    """Conta posts em cada arquivo XML"""
    resultados = {}
    
    for filename in sorted(os.listdir(xml_dir)):
        if not filename.endswith('.xml'):
            continue
            
        filepath = os.path.join(xml_dir, filename)
        
        try:
            tree = ET.parse(filepath)
            root = tree.getroot()
            
            # Contar items que são posts (não páginas ou attachments)
            items = root.findall('.//item')
            posts = []
            
            for item in items:
                post_type = item.find('wp:post_type', namespaces)
                if post_type is not None and post_type.text == 'post':
                    posts.append(item)
            
            resultados[filename] = {
                'total_items': len(items),
                'posts': len(posts),
                'path': filepath
            }
            
        except Exception as e:
            print(f"❌ Erro ao processar {filename}: {e}")
            resultados[filename] = {'error': str(e)}
    
    return resultados

if __name__ == '__main__':
    print("\n📊 ANÁLISE DOS ARQUIVOS XML DO WORDPRESS\n")
    print("=" * 60)
    
    resultados = contar_posts_por_arquivo()
    
    total_posts = 0
    
    for filename, info in resultados.items():
        if 'error' in info:
            print(f"\n❌ {filename}: ERRO - {info['error']}")
        else:
            print(f"\n📁 {filename}")
            print(f"   Total de items: {info['total_items']}")
            print(f"   Posts: {info['posts']}")
            total_posts += info['posts']
    
    print("\n" + "=" * 60)
    print(f"📈 TOTAL DE POSTS: {total_posts}")
    print("=" * 60 + "\n")
