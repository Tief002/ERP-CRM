import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/erp-crm-ai';
    
    await mongoose.connect(mongoUri, {
      retryWrites: true,
      w: 'majority',
    });

    console.log('✅ Base de données MongoDB connectée avec succès');

    // Gestion des événements de connexion
    mongoose.connection.on('error', (error) => {
      console.error('❌ Erreur de connexion MongoDB:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Connexion MongoDB interrompue');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ Reconnexion MongoDB réussie');
    });

    // Gérer l'arrêt gracieux
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 Connexion MongoDB fermée par arrêt de l\'application');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('🔌 Connexion MongoDB fermée');
  } catch (error) {
    console.error('❌ Erreur lors de la fermeture de la connexion:', error);
  }
};