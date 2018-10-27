import { Injectable } from '@angular/core';
import { Hissi } from '../models/hissi';
import { Observable, ReplaySubject } from 'rxjs';
import { timer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

// Todo: hissi poistumaan ajastimilla kerroksista, jos ei tee mitään (v2)
export class OhjausService {
    private secret: string;
    public source;
    public liikkeessä = false;
    private kerroksia = 5;
    private hissinSijainti: number;
    private hissi = new Hissi(this.kerroksia);
    private tilaTietoSubject = new ReplaySubject<{ poikkeus: boolean }>();

    constructor() {
        this.tilaTietoSubject.next({ poikkeus: this.hissi.isHissiHuollossa() });
        this.hissinSijainti = this.hissi.getCurrentKerros();
    }

    /**
     * Tiedottaa huollosta
     * TODO: kunnon luokat poikkeuksille
     */
    getTilaTieto(): Observable<{ poikkeus: boolean }> {
        return this.tilaTietoSubject.asObservable();
    }

    /**
     * Hissi kerrokseen
     */
    tilaaHissi(kohde: number, suunta: string) {
        this.startTimer();
        this.hissi.siirry(kohde);
        this.hissinSijainti = this.hissi.getCurrentKerros();
    }

    public getKerroksia(): number {
        return this.kerroksia;
    }

    /**
     * Hissin liikuttamisen logiikka ja asianomaisten informointi
     */
    public liikuKerrokseen(kerros: number): void {
        this.startTimer();
        this.liikkeessä = true;
        this.hissi.siirry(kerros);
        this.hissinSijainti = this.hissi.getCurrentKerros();
    }

    getHissinSijainti() {
        return this.hissinSijainti;
    }

    private startTimer() {
        this.source = timer(0, 1000);
    }

    /**
     * Tilapäisratkaisu routingiin
     */
    setSecret(salaisuus: string): void {
        this.secret = salaisuus;
    }

    /**
     * Hissi aina refressin jälkeen kerrokseen
     */
    isAuthenticated() {
        return this.secret;
    }
}

