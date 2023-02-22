import React from "react";
export const Footer = () => {
    // @TODO cleanup footer
    return <>
        <footer className="bg-neutral text-neutral-content mt-auto">
            <div className="container mx-auto">
                <div className="footer p-10 flex justify-evenly ">
                    <div>
                        <span className="footer-title">Services</span>
                        <a href="src/components/Footer#" className="link link-hover">Branding</a>
                        <a href="src/components/Footer#" className="link link-hover">Design</a>
                        <a href="src/components/Footer#" className="link link-hover">Marketing</a>
                        <a href="src/components/Footer#" className="link link-hover">Advertisement</a>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <a href="src/components/Footer#" className="link link-hover">About us</a>
                        <a href="src/components/Footer#" className="link link-hover">Contact</a>
                        <a href="src/components/Footer#" className="link link-hover">Jobs</a>
                        <a href="src/components/Footer#" className="link link-hover">Press kit</a>
                    </div>
                    <div>
                        <span className="footer-title">Legal</span>
                        <a href="src/components/Footer#" className="link link-hover">Terms of use</a>
                        <a href="src/components/Footer#" className="link link-hover">Privacy policy</a>
                        <a href="src/components/Footer#" className="link link-hover">Cookie policy</a>
                    </div>
                </div>
            </div>
        </footer>
    </>
};