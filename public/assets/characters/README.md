# Pacote de personagens — Academia Lótus

Este pacote foi organizado a partir dos assets realmente existentes nesta sessão e dos prompts enviados no documento anexado.

## O que está aprovado

`assembled/approved/personagem_mestre_masculino_v1.png` é o único personagem-mestre visualmente aprovado no material atual. `assembled/approved/personagem_recomposto_proporcional_v1.png` é uma cópia recomposta preservando exatamente esse mestre.

## O que está disponível como protótipo

`shared/male_prototype` contém manequins, cinco cabelos masculinos, olhos e bocas com expressões. `shared/female_prototype` contém o manequim feminino e cinco cabelos femininos disponíveis. Esses assets são protótipos compartilhados; não foram atribuídos automaticamente a Dante, Lucas, Theo ou qualquer outro personagem porque isso misturaria identidades e proporções.

## Personagens

As pastas em `characters/` foram criadas para os 12 personagens descritos no anexo: Íris, Dante, Lucas, Theo, Nina, Helena Vance, Melissa Prado, Caio, Ravi, Mara, Rafael e Beatriz. Cada uma contém subpastas para mestre, camadas, montagem e prompts. As que ainda não têm arte própria estão marcadas como pendentes.

## Variações

As expressões disponíveis no protótipo são: neutro, felicidade, raiva, tristeza, nojo, surpresa/medo e ciúmes. Elas estão em `shared/male_prototype/eyes` e `shared/male_prototype/mouths`.

## Regra de qualidade

Não usar as camadas antigas geradas por IA como separação fiel do personagem-mestre: elas foram preservadas somente como material de referência/protótipo. Antes de marcar qualquer personagem como pronto, criar um mestre coerente, separar as partes, recompor na ordem correta e conferir proporções.

## Ferramentas

`tools/` contém o compositor Python, o manifesto de exemplo e o script Godot usado para montar camadas.
