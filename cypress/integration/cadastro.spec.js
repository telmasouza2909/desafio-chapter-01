/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

describe('Tela de Cadastro de Usuário', () => {
    it('Cadastrar um novo usuário', () => {
        // Dado que eu acesso o site
        cy.visit('');

        // E clico no botão de Sign In
        cy.get('[class="login"]').click();

        // E informo um email válido
        cy.get('input#email_create').type(chance.email());
        // Quando clico no botão de Create an account
        cy.get('button#SubmitCreate').click();
        // Então sou direcionado para a página de cadastro
        cy.url().should('contain', 'index.php?controller=authentication&back=my-account#account-creation');
        // cy.get('[class="page-subheading"]').first().should('contain.text', 'Your personal information');
        cy.get('.page-subheading').first().should('contain.text', 'Your personal information');

        // Dado que informo o título
        cy.get('input#id_gender1').check();
        // E informo um nome válido
        cy.get('input#customer_firstname').type(chance.first());
        // E informo um sobrenome válido
        cy.get('input#customer_lastname').type(chance.last());
        // E informo uma senha válida de no mínimo 5 caracteres
        cy.get('input#passwd').type(chance.string({ length: 8, alpha: true }));
        // E informo um dia
        cy.get('select#days').select('12');
        // E informo um mês
        cy.get('select#months').select('October');
        // E informo um ano
        cy.get('select#years').select('1975');
        // E aceito o newsletter
        cy.get('input#newsletter').check();
        // E aceito receber ofertas de terceiros
        cy.get('input#optin').check();

        // E informo um empresa válido
        cy.get('input#company').type(chance.company());
        // E informo um endereço válido
        cy.get('input#address1').type(chance.address());
        // E informo um segundo endereço válido
        cy.get('input#address2').type(chance.address());
        // E informo uma cidade válido
        cy.get('input#city').type(chance.city());
        // E seleciona um país
        cy.get('select#id_country').select('United States');
        // E seleciono um estado
        cy.get('select#id_state').select('Florida');
        // E informo um código postal válido
        cy.get('input#postcode').type(chance.zip());
        // E insiro informações complementares
        cy.get('textarea#other').type(chance.paragraph({ sentences: 1 }));
        // E informo um telefone válido
        cy.get('input#phone').type(chance.phone({ formatted: false }));
        // E informo um celular válido
        cy.get('input#phone_mobile').type(chance.phone({ formatted: false, mobile: true }));
        // E informo uma referência endereço
        cy.get('input#alias').clear().type(chance.word({ length: 20 }));
        // Quando clico no botão de registrar
        cy.get('button#submitAccount').click();

        // Então devo ser direcionado para a área logada
        cy.url().should('contain', 'index.php?controller=my-account');
        cy.get('.info-account').should('contain.text', 'Welcome to your account.');
    });
});