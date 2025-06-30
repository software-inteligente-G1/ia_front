import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeComponent from "../../pages/home/components/welcome/welcome.component";
import GeneticAlgorithmComponent from "../../pages/genetic-algorithm/components/main/genetic-algorithm.component";
import NaiveBayesComponent from "../../pages/naive-bayes/components/main/naive-bayes.component";
import NeuralNetworksComponent from "../../pages/neural-networks/components/main/neural-networks.component";
import NlpComponent from '../../pages/nlp/components/main/nlp.component';
import NotFoundComponent from "../components/not-found/not-found.component";
import MainLayout from "../../layouts/main-layout/main.layout";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<WelcomeComponent />} />
          <Route path="/genetic-algorithm" element={<GeneticAlgorithmComponent />} />
          <Route path="/naive-bayes" element={<NaiveBayesComponent />} />
          <Route path="/neural-networks" element={<NeuralNetworksComponent />} />
          <Route path="/nlp" element={<NlpComponent />} />
        </Route>
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </BrowserRouter>
  );
}