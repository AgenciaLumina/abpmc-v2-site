import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ContactForm() {
  return (
    <section className="py-16 bg-white">
      <Container size="md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Entre em Contato</CardTitle>
            <p className="text-center text-neutral-500 mt-2">
              Preencha o formulário abaixo e entraremos em contato em breve.
            </p>
          </CardHeader>
          
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    aria-required="true"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    aria-required="true"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                  Telefone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                  Assunto <span className="text-red-500">*</span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Assunto da mensagem"
                  aria-required="true"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Digite sua mensagem aqui..."
                  aria-required="true"
                  className="flex w-full rounded-sm border border-neutral-200 bg-white px-6 py-3 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>
              
              <div className="flex justify-center">
                <Button type="submit" variant="primary" size="lg">
                  Enviar Mensagem
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
