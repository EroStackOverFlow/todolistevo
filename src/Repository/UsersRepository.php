<?php

namespace App\Repository;

use App\Entity\Tasks;
use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Users|null find($id, $lockMode = null, $lockVersion = null)
 * @method Users|null findOneBy(array $criteria, array $orderBy = null)
 * @method Users[]    findAll()
 * @method Users[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UsersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Users::class);
    }


     /**
      * @return Tasks[] Returns an array of Users objects
      */
    public function getAllUserTask()
    {
        return $this->createQueryBuilder('u')
            ->orderBy('u.tasks ', 'desc')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @return Users[] Returns an array of Users objects
     */
    function getAllUser(){
       return $this->findAll();
    }

}
