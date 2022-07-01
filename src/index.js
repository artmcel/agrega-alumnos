/**
 * main pricipal del proyecto, este es el que se carga en el index.html
 */

//import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';
//import bootsrap si lo necesitas

/**
 * importamos el modulo de forma simple para que no ejecute como funcion, sino hasta que sea llamado en el componentes.js
 * en este archivo esta construida toda la logica del proyecto...
 * 
 */
import( /* webpackChunkName: "componentes" */ './js/componentes' );